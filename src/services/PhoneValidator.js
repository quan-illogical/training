
export default function PhoneValidator({input}) {
    const regex = new RegExp(/^[0-9\-+]{9,15}$/)
    return regex.test(input)
}
