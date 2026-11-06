// Usage: swift thumbs.swift <srcDir> <outDir> <maxSide>
// Resizes every image (skipping names containing '*') so the long side is <= maxSide.
// Images with real transparency -> PNG, otherwise -> JPEG (q 0.82).
import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
let src = URL(fileURLWithPath: args[1])
let out = URL(fileURLWithPath: args[2])
let maxSide = Int(args[3])!
try? FileManager.default.createDirectory(at: out, withIntermediateDirectories: true)

let exts = ["png", "jpg", "jpeg", "webp"]
let files = try FileManager.default.contentsOfDirectory(atPath: src.path).sorted()
for name in files {
    let url = src.appendingPathComponent(name)
    guard exts.contains(url.pathExtension.lowercased()), !name.contains("*") else { continue }
    guard let isrc = CGImageSourceCreateWithURL(url as CFURL, nil),
          let img = CGImageSourceCreateImageAtIndex(isrc, 0, [kCGImageSourceShouldCacheImmediately: true] as CFDictionary)
    else { print("skip \(name)"); continue }

    let w = img.width, h = img.height
    let s = min(1.0, Double(maxSide) / Double(max(w, h)))
    let nw = max(1, Int((Double(w) * s).rounded())), nh = max(1, Int((Double(h) * s).rounded()))

    let cs = CGColorSpace(name: CGColorSpace.sRGB)!
    let ctx = CGContext(data: nil, width: nw, height: nh, bitsPerComponent: 8, bytesPerRow: nw * 4,
                        space: cs, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    ctx.interpolationQuality = .high
    ctx.draw(img, in: CGRect(x: 0, y: 0, width: nw, height: nh))

    // real transparency check
    var transparent = false
    if let data = ctx.data {
        let p = data.bindMemory(to: UInt8.self, capacity: nw * nh * 4)
        var i = 3
        while i < nw * nh * 4 { if p[i] < 250 { transparent = true; break }; i += 4 }
    }
    let resized = ctx.makeImage()!
    let base = url.deletingPathExtension().lastPathComponent
    let outURL = out.appendingPathComponent(base + (transparent ? ".png" : ".jpg"))
    let type = (transparent ? UTType.png : UTType.jpeg).identifier as CFString
    let dest = CGImageDestinationCreateWithURL(outURL as CFURL, type, 1, nil)!
    let opts: [CFString: Any] = transparent ? [:] : [kCGImageDestinationLossyCompressionQuality: 0.82]
    CGImageDestinationAddImage(dest, resized, opts as CFDictionary)
    CGImageDestinationFinalize(dest)
    let size = (try? FileManager.default.attributesOfItem(atPath: outURL.path)[.size] as? Int) ?? 0
    print("\(outURL.lastPathComponent)\t\(nw)x\(nh)\t\(size / 1024)KB\t\(transparent ? "alpha" : "")")
}
