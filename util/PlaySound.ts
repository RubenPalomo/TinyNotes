import { Audio, AVPlaybackSource } from "expo-av";

let soundObject: Audio.Sound | null = null;

export async function PlaySound(
    audioSource: AVPlaybackSource,
    playInLoop: boolean
) {
    try {
        if (!soundObject) {
            soundObject = new Audio.Sound();
            await soundObject.loadAsync(audioSource);
        }
        await soundObject.replayAsync();
        await soundObject.setIsLoopingAsync(playInLoop);
    } catch (error) {
        console.error("Error while playing sound:", error);
    }
}

export const PlayClickSound = (): void => {
    PlaySound(require("../assets/sounds/press-in.mp3"), false);
};
