export function isResponseSuccess(response) {
  if (response.status === "success") return true;
  if (response.code === 200) return true;
  if (response.code === "success") return true;
  if (response.status === 200) return true;
  if (response.code === "ok") return true;
  if (response.code === "OK") return true;
  return false;
}

export function isResponseError(response) {
  if (response.status === "error") return true;
  if (response.code === 400) return true;
  if (response.code === "error") return true;
  if (response.status === 400) return true;
  if (response.code === "error") return true;
  if (response.code === "ERROR") return true;
  return false
}