export const getTimeAgo = (created_at: string): string => {
  try {
    const timeAgo = Date.now() - new Date(created_at).getTime();
    const seconds = Math.floor(timeAgo / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (seconds <= 59) return `${seconds}s`;
    if (minutes <= 59) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 365) return `${days}d`;
    return "a while ago";
  } catch (error) {
    return "we don't know when this was created";
  }
};
