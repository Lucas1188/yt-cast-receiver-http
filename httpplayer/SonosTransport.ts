export type TransportState = 'PLAYING' | 'PAUSED_PLAYBACK' | 'STOPPED' | 'TRANSITIONING';
export type TransportStatus = 'OK' | 'ERROR' | string;

export interface SonosTransportStatus {
  current_transport_status: TransportStatus;
  current_transport_state: TransportState;
  current_transport_speed: string; // Sonos uses strings like "1", "-1"
}