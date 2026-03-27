export const getStationImage = (stationName: string): string => {
  const name = stationName.trim().toLowerCase()

  const mapping: Record<string, string> = {
    shell: 'shell.png',
    okko: 'okko.jpg',
    ukrnafta: 'urknafta.jpg',
    wog: 'wog.png',
    amic: 'amic.png',
    socar: 'socar.png',
    brsm: 'brsm.webp',
    upg: 'upg.webp',
  }

  const fileName = mapping[name] || 'default.png'

  return new URL(`../../assets/images/fuel-stations/${fileName}`, import.meta.url).href
}
