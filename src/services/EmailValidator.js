
export default function EmailValidator({str}) {
    const regex = new RegExp(/^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm)
    return regex.test(str)
}
