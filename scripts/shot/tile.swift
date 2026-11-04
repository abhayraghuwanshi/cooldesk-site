// Crop a raw window capture and flatten it onto a solid colour, for the
// feature bento's tile images (FeatureBento.tsx).
//
//   swift tile.swift <in.png> <out.jpg|out.png> <x,y,w,h in pixels> <maxWidth> <#rrggbb|none>
//
// "none" keeps the window's transparency and writes a PNG, so cards float on
// whatever is behind them (the tile's glow) with no box around them.
//
// Raw captures come from `screencapture -o -l <window>` (see capture.swift)
// and keep the window's transparency, so cards float on the tile colour with
// no wallpaper behind them. Prints "<width> <height>".

import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

func fail(_ m: String) -> Never { FileHandle.standardError.write((m + "\n").data(using: .utf8)!); exit(1) }

let a = CommandLine.arguments
if a.count < 6 { fail("usage: tile.swift <in.png> <out.jpg> <x,y,w,h> <maxWidth> <#rrggbb>") }
guard let data = try? Data(contentsOf: URL(fileURLWithPath: a[1])),
      let src = CGImageSourceCreateWithData(data as CFData, nil),
      let full = CGImageSourceCreateImageAtIndex(src, 0, nil) else { fail("can't read \(a[1])") }
let r = a[3].split(separator: ",").compactMap { Double($0) }
guard r.count == 4, let img = full.cropping(to: CGRect(x: r[0], y: r[1], width: r[2], height: r[3])) else { fail("bad crop") }
let transparent = a[5] == "none"
let hex = a[5].trimmingCharacters(in: CharacterSet(charactersIn: "#"))
let v = UInt32(hex, radix: 16) ?? 0
if !transparent && hex.count != 6 { fail("bad colour") }

let scale = min(1, Double(a[4])! / Double(img.width))
let w = Int((Double(img.width) * scale).rounded()), h = Int((Double(img.height) * scale).rounded())
guard let ctx = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: 0,
                          space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { fail("canvas") }
ctx.interpolationQuality = .high
if !transparent {
    ctx.setFillColor(CGColor(red: CGFloat((v >> 16) & 255) / 255, green: CGFloat((v >> 8) & 255) / 255, blue: CGFloat(v & 255) / 255, alpha: 1))
    ctx.fill(CGRect(x: 0, y: 0, width: w, height: h))
}
ctx.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))
guard let out = ctx.makeImage(),
      let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[2]) as CFURL, (transparent ? UTType.png : UTType.jpeg).identifier as CFString, 1, nil) else { fail("write") }
CGImageDestinationAddImage(dest, out, [kCGImageDestinationLossyCompressionQuality: 0.85] as CFDictionary)
if !CGImageDestinationFinalize(dest) { fail("write") }
print(w, h)
