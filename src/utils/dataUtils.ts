export const formatTimeRemaining = (dateString: string) => {
  if (!dateString) return;
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 60) {
    return `${diffMinutes}mins`;
  } else if (diffHours < 24) {
    return `${diffHours}hours`;
  } else {
    return `${diffDays}days`;
  }
};
