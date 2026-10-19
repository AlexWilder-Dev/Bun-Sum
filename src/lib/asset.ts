// Files in public/ live under the GitHub Pages base path.
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const menuPhoto = (stem: string, width: 360 | 720) => asset(`img/menu/${stem}-${width}.webp`)
