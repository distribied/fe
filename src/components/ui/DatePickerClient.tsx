"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type DatePickerClientProps = React.ComponentProps<typeof DayPicker>;

export function DatePickerClient(props: DatePickerClientProps) {
  return <DayPicker {...props} />;
}
