export default function URLPacket(data: object) {
    return Object.entries(data).reduce((a, [k, v]) => (v ? a + `&${k}=${v}` : a), "")
}