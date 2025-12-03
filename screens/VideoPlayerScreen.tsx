import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing } from "@/constants/theme";
import type { RootStackParamList } from "@/navigation/RootNavigator";
import { Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as ScreenOrientation from "expo-screen-orientation";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    Pressable,
    StatusBar,
    StyleSheet,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function VideoPlayerScreen() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, "VideoPlayer">>();
    const insets = useSafeAreaInsets();

    const [showControls, setShowControls] = useState(true);
    const [isLandscape, setIsLandscape] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Default video if none provided
    const videoSource = route.params?.videoUrl
        ? route.params.videoUrl
        : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.play();
    });

    useEffect(() => {
        const subscription = player.addListener('playingChange', (payload) => {
            setIsPlaying(payload.isPlaying);
        });

        return () => {
            subscription.remove();
        };
    }, [player]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(player.currentTime);
            setDuration(player.duration);
        }, 500);

        return () => clearInterval(interval);
    }, [player]);

    useEffect(() => {
        resetControlsTimeout();
        return () => {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
            unlockOrientation();
        };
    }, []);

    const unlockOrientation = async () => {
        await ScreenOrientation.unlockAsync();
    };

    const resetControlsTimeout = () => {
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        setShowControls(true);
        controlsTimeoutRef.current = setTimeout(() => {
            if (player.playing) {
                setShowControls(false);
            }
        }, 3000);
    };

    const handleScreenPress = () => {
        if (showControls) {
            setShowControls(false);
        } else {
            resetControlsTimeout();
        }
    };

    const togglePlayPause = () => {
        if (player.playing) {
            player.pause();
        } else {
            player.play();
        }
        resetControlsTimeout();
    };

    const handleRewind = () => {
        player.currentTime = Math.max(0, player.currentTime - 10);
        resetControlsTimeout();
    };

    const handleForward = () => {
        player.currentTime = Math.min(player.duration, player.currentTime + 10);
        resetControlsTimeout();
    };

    const handleSeek = (value: number) => {
        player.currentTime = value;
        resetControlsTimeout();
    };

    const toggleFullscreen = async () => {
        if (isLandscape) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            setIsLandscape(false);
        } else {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
            setIsLandscape(true);
        }
    };

    const handleBack = async () => {
        await unlockOrientation();
        navigation.goBack();
    };

    const formatTime = (seconds: number) => {
        const totalSeconds = Math.floor(seconds);
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />

            <Pressable style={styles.videoContainer} onPress={handleScreenPress}>
                <VideoView
                    style={styles.video}
                    player={player}
                    fullscreenOptions={{ enable: true }}
                    allowsPictureInPicture
                    nativeControls={false}
                />
            </Pressable>

            {/* Dark Overlay for Controls */}
            {showControls && (
                <View style={styles.controlsOverlay} pointerEvents="box-none">
                    <View style={styles.darkOverlay} />

                    {/* Top Controls */}
                    <View style={[styles.topControls, { paddingTop: insets.top + Spacing.md }]}>
                        <Pressable
                            onPress={handleBack}
                            style={({ pressed }) => [
                                styles.backButton,
                                { opacity: pressed ? 0.7 : 1 }
                            ]}
                        >
                            <Feather name="chevron-left" size={28} color={Colors.dark.text} />
                        </Pressable>
                    </View>

                    {/* Center Controls */}
                    <View style={styles.centerControls}>
                        {/* Rewind Button */}
                        <Pressable
                            onPress={handleRewind}
                            style={({ pressed }) => [
                                styles.controlButton,
                                { opacity: pressed ? 0.7 : 1 }
                            ]}
                        >
                            <Feather name="rotate-ccw" size={32} color={Colors.dark.text} />
                            <ThemedText type="small" style={styles.controlLabel}>10</ThemedText>
                        </Pressable>

                        {/* Play/Pause Button */}
                        <Pressable
                            onPress={togglePlayPause}
                            style={({ pressed }) => [
                                styles.playPauseButton,
                                { opacity: pressed ? 0.7 : 1 }
                            ]}
                        >
                            <Feather
                                name={isPlaying ? "pause" : "play"}
                                size={40}
                                color={Colors.dark.text}
                                style={isPlaying ? {} : { marginLeft: 4 }}
                            />
                        </Pressable>

                        {/* Forward Button */}
                        <Pressable
                            onPress={handleForward}
                            style={({ pressed }) => [
                                styles.controlButton,
                                { opacity: pressed ? 0.7 : 1 }
                            ]}
                        >
                            <Feather name="rotate-cw" size={32} color={Colors.dark.text} />
                            <ThemedText type="small" style={styles.controlLabel}>10</ThemedText>
                        </Pressable>
                    </View>

                    {/* Bottom Bar */}
                    <LinearGradient
                        colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
                        style={[styles.bottomBar, { paddingBottom: insets.bottom + Spacing.md }]}
                    >
                        {/* Progress Bar */}
                        <View style={styles.progressBarContainer}>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={duration}
                                value={currentTime}
                                onSlidingComplete={handleSeek}
                                minimumTrackTintColor={Colors.dark.primary}
                                maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                                thumbTintColor={Colors.dark.primary}
                            />
                        </View>

                        <View style={styles.bottomControlsRow}>
                            <ThemedText type="small" style={styles.timeText}>
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </ThemedText>

                            <View style={styles.bottomRightControls}>
                                <Pressable style={styles.bottomButton}>
                                    <Feather name="message-square" size={20} color={Colors.dark.text} />
                                </Pressable>
                                <Pressable onPress={toggleFullscreen} style={styles.bottomButton}>
                                    <Feather name={isLandscape ? "minimize" : "maximize"} size={20} color={Colors.dark.text} />
                                </Pressable>
                                <Pressable style={styles.bottomButton}>
                                    <Feather name="more-vertical" size={20} color={Colors.dark.text} />
                                </Pressable>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    videoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    video: {
        width: "100%",
        height: "100%",
    },
    controlsOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
    },
    darkOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    topControls: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: Spacing.md,
        zIndex: 20,
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: 22,
    },
    centerControls: {
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 60,
        transform: [{ translateY: -40 }],
        zIndex: 20,
    },
    controlButton: {
        width: 64,
        height: 64,
        justifyContent: "center",
        alignItems: "center",
    },
    controlLabel: {
        position: "absolute",
        fontSize: 10,
        fontWeight: "700",
        color: Colors.dark.text,
        bottom: 16,
    },
    playPauseButton: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 40,
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: Spacing.lg,
        zIndex: 20,
    },
    progressBarContainer: {
        height: 40,
        justifyContent: "center",
        marginBottom: -10,
    },
    slider: {
        width: "100%",
        height: 40,
    },
    bottomControlsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: -5,
    },
    timeText: {
        color: Colors.dark.text,
        fontWeight: "500",
    },
    bottomRightControls: {
        flexDirection: "row",
        gap: Spacing.lg,
    },
    bottomButton: {
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },
});
