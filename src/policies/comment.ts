export function canRedirectToReplys(path: string, commentId: number) {
  return path != `/users/comments/${commentId}`;
}
