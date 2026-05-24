const isElectron = !!window.electronAPI

export async function writeTeam(data: object) {
  if (isElectron) {
    await window.electronAPI.writeTeam(data)
  } else {
    localStorage.setItem('userData', JSON.stringify(data))
  }
}

export async function readTeam() {
  if (isElectron) {
    return await window.electronAPI.readTeam()
  } else {
    const raw = localStorage.getItem('userData')
    return raw ? JSON.parse(raw) : {}
  }
}

