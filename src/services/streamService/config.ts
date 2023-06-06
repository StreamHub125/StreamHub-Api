import ffmpeg from "@ffmpeg-installer/ffmpeg";

export const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    mediaroot: "../media",
    allow_origin: "*",
  },
  trans: {
    ffmpeg: ffmpeg.path,
    tasks: [
      {
        app: "streamhub_live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        hlsKeep: true, // to prevent hls file delete after end the stream
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
        dashKeep: true, // to prevent dash file delete after end the stream
      },
    ],
  },
};
