import ApiCountryCode from '../ultis/ApiCountryCode/'
const getFlagIcon = (
    style=ApiCountryCode.COUNTRY_FLAG.STYLE.FLAT,
    size=ApiCountryCode.COUNTRY_FLAG.SIZE[64],
    code=`VN`) =>
    `${ApiCountryCode.COUNTRY_FLAG.BASE_URL}/${style}/${size}/${code}.png`

export default {getFlagIcon};