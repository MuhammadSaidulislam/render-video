import { z } from "zod";
export declare const CaptionStyleSchema: z.ZodObject<{
    fontFamily: z.ZodOptional<z.ZodString>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    fontWeight: z.ZodOptional<z.ZodString>;
    textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
    position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    fontFamily: z.ZodOptional<z.ZodString>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    fontWeight: z.ZodOptional<z.ZodString>;
    textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
    position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    fontFamily: z.ZodOptional<z.ZodString>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    fontWeight: z.ZodOptional<z.ZodString>;
    textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
    position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
}, z.ZodTypeAny, "passthrough">>;
export type CaptionStyle = z.infer<typeof CaptionStyleSchema>;
export declare const CaptionSchema: z.ZodObject<{
    text: z.ZodString;
    startFrame: z.ZodNumber;
    endFrame: z.ZodNumber;
    style: z.ZodOptional<z.ZodObject<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
    }, z.ZodTypeAny, "passthrough">>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    text: z.ZodString;
    startFrame: z.ZodNumber;
    endFrame: z.ZodNumber;
    style: z.ZodOptional<z.ZodObject<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
    }, z.ZodTypeAny, "passthrough">>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    text: z.ZodString;
    startFrame: z.ZodNumber;
    endFrame: z.ZodNumber;
    style: z.ZodOptional<z.ZodObject<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
    }, z.ZodTypeAny, "passthrough">>>;
}, z.ZodTypeAny, "passthrough">>;
export type Caption = z.infer<typeof CaptionSchema>;
export declare const SceneSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    videoUrl: z.ZodOptional<z.ZodString>;
    durationInFrames: z.ZodNumber;
    text: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    transition: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    videoUrl: z.ZodOptional<z.ZodString>;
    durationInFrames: z.ZodNumber;
    text: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    transition: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    videoUrl: z.ZodOptional<z.ZodString>;
    durationInFrames: z.ZodNumber;
    text: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    transition: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export type Scene = z.infer<typeof SceneSchema>;
export declare const RenderPayloadSchema: z.ZodObject<{
    scenes: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        imageUrl: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        durationInFrames: z.ZodNumber;
        text: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        transition: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodString>;
        imageUrl: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        durationInFrames: z.ZodNumber;
        text: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        transition: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodString>;
        imageUrl: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        durationInFrames: z.ZodNumber;
        text: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        transition: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>, "many">;
    voiceoverUrl: z.ZodDefault<z.ZodString>;
    musicUrl: z.ZodDefault<z.ZodString>;
    musicVolume: z.ZodDefault<z.ZodNumber>;
    captions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        startFrame: z.ZodNumber;
        endFrame: z.ZodNumber;
        style: z.ZodOptional<z.ZodObject<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        text: z.ZodString;
        startFrame: z.ZodNumber;
        endFrame: z.ZodNumber;
        style: z.ZodOptional<z.ZodObject<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        text: z.ZodString;
        startFrame: z.ZodNumber;
        endFrame: z.ZodNumber;
        style: z.ZodOptional<z.ZodObject<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    defaultCaptionStyle: z.ZodDefault<z.ZodObject<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
    }, z.ZodTypeAny, "passthrough">>>;
    exportId: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    scenes: z.objectOutputType<{
        id: z.ZodOptional<z.ZodString>;
        imageUrl: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        durationInFrames: z.ZodNumber;
        text: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        transition: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">[];
    voiceoverUrl: string;
    musicUrl: string;
    musicVolume: number;
    captions: z.objectOutputType<{
        text: z.ZodString;
        startFrame: z.ZodNumber;
        endFrame: z.ZodNumber;
        style: z.ZodOptional<z.ZodObject<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">[];
    defaultCaptionStyle: {
        fontFamily?: string | undefined;
        fontSize?: number | undefined;
        color?: string | undefined;
        backgroundColor?: string | undefined;
        fontWeight?: string | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        position?: "center" | "top" | "bottom" | undefined;
    } & {
        [k: string]: unknown;
    };
    exportId: string;
    userId: string;
}, {
    scenes: z.objectInputType<{
        id: z.ZodOptional<z.ZodString>;
        imageUrl: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        durationInFrames: z.ZodNumber;
        text: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        transition: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">[];
    exportId: string;
    userId: string;
    voiceoverUrl?: string | undefined;
    musicUrl?: string | undefined;
    musicVolume?: number | undefined;
    captions?: z.objectInputType<{
        text: z.ZodString;
        startFrame: z.ZodNumber;
        endFrame: z.ZodNumber;
        style: z.ZodOptional<z.ZodObject<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodNumber>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
        }, z.ZodTypeAny, "passthrough">>>;
    }, z.ZodTypeAny, "passthrough">[] | undefined;
    defaultCaptionStyle?: z.objectInputType<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        position: z.ZodOptional<z.ZodEnum<["top", "bottom", "center"]>>;
    }, z.ZodTypeAny, "passthrough"> | undefined;
}>;
export type RenderPayload = z.infer<typeof RenderPayloadSchema>;
export interface RenderResult {
    ok: boolean;
    exportId: string;
    url: string;
    durationMs: number;
}
//# sourceMappingURL=types.d.ts.map