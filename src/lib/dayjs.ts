import dayjs from "dayjs";
import "dayjs/locale/fi";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.locale("fi");

dayjs.tz.setDefault("Europe/Helsinki");
