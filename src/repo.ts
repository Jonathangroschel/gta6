// The GitHub repository, set at build time from GITHUB_REPOSITORY (see vite.config.ts).
// Credits link here, to the source and its license, rather than to the deployed files.
declare const __REPO_URL__: string;
export const REPO_URL = __REPO_URL__;
export const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;
