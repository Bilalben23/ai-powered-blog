import imagekit from "@/configs/imagekit.ts";

export const uploadImageAndGetOptimizedUrl = async (
    buffer: Buffer,
    fileName: string
): Promise<string> => {

    const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName,
        folder: "/blogs"
    })

    // return optimized URL
    return imagekit.url({
        path: uploadResponse.filePath,
        transformation: [
            { quality: "auto" },
            { format: "webp" },
            { width: "1280" }
        ]
    });
};