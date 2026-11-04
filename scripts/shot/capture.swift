// Grab one CoolDesk window and composite it onto a wallpaper.
//
//   swift capture.swift <window> <placement> <background> <out.jpg> [maxWidth] [crop x,y,w,h]
//
// window:     main | spotlight | handle  (by window title; main = "CoolDesk")
// placement:  tight  — the window plus a margin
//             right  — a 16:10 desktop with the window docked on its right edge
//             left   — the same, docked left
//             bottom — a 16:10 desktop with the window along the bottom
// crop:       optional, in window points from its top-left (e.g. 0,500,360,320)
// Prints "<width> <height>" of the written JPEG.
//
// Capture uses `screencapture -l <id>`: no clicks or keystrokes go to the app,
// and it works while a drawer is tucked away. Needs Screen Recording
// permission for the terminal.

import AppKit
import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

func fail(_ msg: String) -> Never {
    FileHandle.standardError.write((msg + "\n").data(using: .utf8)!)
    exit(1)
}

let args = CommandLine.arguments
if args.count < 5 { fail("usage: capture.swift <main|spotlight|handle> <tight|right|left|bottom> <background> <out.jpg> [maxWidth]") }
let which = args[1], placement = args[2], bgPath = args[3], outPath = args[4]
let maxWidth = args.count > 5 ? Int(args[5]) ?? 2000 : 2000

let titles = ["main": "CoolDesk", "spotlight": "CoolDesk Spotlight", "handle": "CoolDesk Handle"]
guard let title = titles[which] else { fail("unknown window \(which)") }

// The biggest window owned by CoolDesk with that exact title.
let list = CGWindowListCopyWindowInfo([.optionAll], kCGNullWindowID) as? [[String: Any]] ?? []
let match = list
    .filter { ($0[kCGWindowOwnerName as String] as? String) == "CoolDesk" && ($0[kCGWindowName as String] as? String) == title }
    .max { a, b in
        let ab = a[kCGWindowBounds as String] as? [String: CGFloat] ?? [:]
        let bb = b[kCGWindowBounds as String] as? [String: CGFloat] ?? [:]
        return (ab["Width"] ?? 0) * (ab["Height"] ?? 0) < (bb["Width"] ?? 0) * (bb["Height"] ?? 0)
    }
guard let win = match, let id = win[kCGWindowNumber as String] as? Int else { fail("no CoolDesk window titled “\(title)” — is CoolDesk running?") }

let tmp = NSTemporaryDirectory() + "cooldesk-shot-\(id).png"
let p = Process()
p.executableURL = URL(fileURLWithPath: "/usr/sbin/screencapture")
p.arguments = ["-x", "-o", "-l", String(id), tmp]
try! p.run()
p.waitUntilExit()

func load(_ path: String) -> CGImage {
    // Read the bytes up front: CGImageSource decodes lazily, and the capture's
    // temp file is deleted before the image is drawn.
    guard let data = try? Data(contentsOf: URL(fileURLWithPath: path)),
          let src = CGImageSourceCreateWithData(data as CFData, nil),
          let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { fail("can't read \(path)") }
    return img
}
var shot = load(tmp)
try? FileManager.default.removeItem(atPath: tmp)
let bg = load(bgPath)

if args.count > 6 {
    let n = args[6].split(separator: ",").compactMap { Double($0) }
    let winW = (win[kCGWindowBounds as String] as? [String: CGFloat])?["Width"] ?? CGFloat(shot.width)
    let k = CGFloat(shot.width) / winW // pixels per point (2 on Retina)
    guard n.count == 4, let cropped = shot.cropping(to: CGRect(x: n[0] * k, y: n[1] * k, width: n[2] * k, height: n[3] * k)) else { fail("bad crop \(args[6])") }
    shot = cropped
}

let w = CGFloat(shot.width), h = CGFloat(shot.height)
let pad: CGFloat = max(48, min(w, h) * 0.06)
let aspect: CGFloat = 16.0 / 10.0

var W: CGFloat, H: CGFloat, x: CGFloat, y: CGFloat
switch placement {
case "tight":
    W = w + 2 * pad; H = h + 2 * pad; x = pad; y = pad
case "right", "left":
    H = h + pad; W = max(H * aspect, w + 2 * pad)
    x = placement == "right" ? W - w : 0
    y = (H - h) / 2
case "bottom":
    W = max(w + 4 * pad, (h + pad) * aspect)
    H = W / aspect
    x = (W - w) / 2; y = 0
default:
    fail("unknown placement \(placement)")
}

let scale = min(1, CGFloat(maxWidth) / W)
let outW = Int((W * scale).rounded()), outH = Int((H * scale).rounded())
guard let ctx = CGContext(data: nil, width: outW, height: outH, bitsPerComponent: 8, bytesPerRow: 0,
                          space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)
else { fail("can't make canvas") }
ctx.interpolationQuality = .high
ctx.scaleBy(x: scale, y: scale)

// Wallpaper, aspect-fill, dimmed so the UI reads like it does on a real desktop.
let bw = CGFloat(bg.width), bh = CGFloat(bg.height)
let fill = max(W / bw, H / bh)
ctx.draw(bg, in: CGRect(x: (W - bw * fill) / 2, y: (H - bh * fill) / 2, width: bw * fill, height: bh * fill))
ctx.setFillColor(CGColor(red: 0, green: 0, blue: 0, alpha: 0.35))
ctx.fill(CGRect(x: 0, y: 0, width: W, height: H))

ctx.draw(shot, in: CGRect(x: x, y: y, width: w, height: h))

guard let out = ctx.makeImage(),
      let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: outPath) as CFURL, UTType.jpeg.identifier as CFString, 1, nil)
else { fail("can't write \(outPath)") }
CGImageDestinationAddImage(dest, out, [kCGImageDestinationLossyCompressionQuality: 0.82] as CFDictionary)
if !CGImageDestinationFinalize(dest) { fail("can't write \(outPath)") }
print(outW, outH)
