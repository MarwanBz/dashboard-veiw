// "use client"

// import * as React from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { DayPicker } from "react-day-picker"

// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"

// export type CalendarProps = React.ComponentProps<typeof DayPicker>

// function Calendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: CalendarProps) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn("p-3", className)}
//       classNames={{
//         months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//         month: "space-y-4",
//         caption: "flex justify-center pt-1 relative items-center",
//         caption_label: "text-sm font-medium",
//         nav: "space-x-1 flex items-center",
//         nav_button: cn(
//           buttonVariants({ variant: "outline" }),
//           "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
//         ),
//         nav_button_previous: "absolute left-1",
//         nav_button_next: "absolute right-1",
//         table: "w-full border-collapse space-y-1",
//         head_row: "flex",
//         head_cell:
//           "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
//         row: "flex w-full mt-2",
//         cell: cn(
//           "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
//           props.mode === "range"
//             ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
//             : "[&:has([aria-selected])]:rounded-md"
//         ),
//         day: cn(
//           buttonVariants({ variant: "ghost" }),
//           "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
//         ),
//         day_range_start: "day-range-start",
//         day_range_end: "day-range-end",
//         day_selected:
//           "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
//         day_today: "bg-accent text-accent-foreground",
//         day_outside:
//           "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
//         day_disabled: "text-muted-foreground opacity-50",
//         day_range_middle:
//           "aria-selected:bg-accent aria-selected:text-accent-foreground",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
//         IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
//       }}
//       {...props}
//     />
//   )
// }
// Calendar.displayName = "Calendar"

// export { Calendar }

"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import {
  DayPicker,
  labelNext,
  labelPrevious,
  useDayPicker,
  type DayPickerProps,
} from "react-day-picker";

export type CalendarProps = DayPickerProps & {
  /**
   * In the year view, the number of years to display at once.
   * @default 12
   */
  yearRange?: number;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  yearRange = 12,
  numberOfMonths,
  ...props
}: CalendarProps) {
  const [navView, setNavView] = React.useState<"days" | "years">("days");
  const [displayYears, setDisplayYears] = React.useState<{
    from: number;
    to: number;
  }>(
    React.useMemo(() => {
      const currentYear = new Date().getFullYear();
      return {
        from: currentYear - Math.floor(yearRange / 2 - 1),
        to: currentYear + Math.ceil(yearRange / 2),
      };
    }, [yearRange])
  );

  const { onNextClick, onPrevClick, startMonth, endMonth } = props;

  const columnsDisplayed = navView === "years" ? 1 : numberOfMonths;

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      style={{
        width: 248.8 * (columnsDisplayed ?? 1) + "px",
      }}
      classNames={{
        months: "flex flex-col relative",
        month_caption: "flex justify-center h-7 mx-10 relative items-center",
        weekdays: "flex flex-row",
        weekday: "text-muted-foreground w-8 font-normal text-[0.8rem]",
        month: "gap-y-4 overflow-x-hidden w-full",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium truncate",
        button_next: cn(
          buttonVariants({
            variant: "outline",
            className:
              "absolute right-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          })
        ),
        button_previous: cn(
          buttonVariants({
            variant: "outline",
            className:
              "absolute left-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          })
        ),
        nav: "flex items-start",
        month_grid: "mt-4",
        week: "flex w-full mt-2",
        day: "p-0 size-8 text-sm flex-1 flex items-center justify-center has-[button]:hover:!bg-accent rounded-md has-[button]:hover:aria-selected:!bg-primary has-[button]:hover:text-accent-foreground has-[button]:hover:aria-selected:text-primary-foreground",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal transition-none hover:bg-transparent hover:text-inherit aria-selected:opacity-100"
        ),
        range_start: "day-range-start rounded-s-md",
        range_end: "day-range-end rounded-e-md",
        selected:
          "bg-primary text-primary-foreground hover:!bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent hover:aria-selected:!bg-accent rounded-none aria-selected:text-accent-foreground hover:aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className="h-4 w-4" />;
        },
        Nav: ({ className, children, ...props }) => {
          const { nextMonth, previousMonth, goToMonth } = useDayPicker();

          const isPreviousDisabled = (() => {
            if (navView === "years") {
              return (
                (startMonth &&
                  differenceInCalendarDays(
                    new Date(displayYears.from - 1, 0, 1),
                    startMonth
                  ) < 0) ||
                (endMonth &&
                  differenceInCalendarDays(
                    new Date(displayYears.from - 1, 0, 1),
                    endMonth
                  ) > 0)
              );
            }
            return !previousMonth;
          })();

          const isNextDisabled = (() => {
            if (navView === "years") {
              return (
                (startMonth &&
                  differenceInCalendarDays(
                    new Date(displayYears.to + 1, 0, 1),
                    startMonth
                  ) < 0) ||
                (endMonth &&
                  differenceInCalendarDays(
                    new Date(displayYears.to + 1, 0, 1),
                    endMonth
                  ) > 0)
              );
            }
            return !nextMonth;
          })();

          const handlePreviousClick = React.useCallback(() => {
            if (!previousMonth) return;
            if (navView === "years") {
              setDisplayYears((prev) => ({
                from: prev.from - (prev.to - prev.from + 1),
                to: prev.to - (prev.to - prev.from + 1),
              }));
              onPrevClick?.(
                new Date(
                  displayYears.from - (displayYears.to - displayYears.from),
                  0,
                  1
                )
              );
              return;
            }
            goToMonth(previousMonth);
            onPrevClick?.(previousMonth);
          }, [previousMonth, goToMonth]);

          const handleNextClick = React.useCallback(() => {
            if (!nextMonth) return;
            if (navView === "years") {
              setDisplayYears((prev) => ({
                from: prev.from + (prev.to - prev.from + 1),
                to: prev.to + (prev.to - prev.from + 1),
              }));
              onNextClick?.(
                new Date(
                  displayYears.from + (displayYears.to - displayYears.from),
                  0,
                  1
                )
              );
              return;
            }
            goToMonth(nextMonth);
            onNextClick?.(nextMonth);
          }, [goToMonth, nextMonth]);
          return (
            <nav className={cn("flex items-center", className)} {...props}>
              <Button
                variant="outline"
                className="absolute left-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
                type="button"
                tabIndex={isPreviousDisabled ? undefined : -1}
                disabled={isPreviousDisabled}
                aria-label={
                  navView === "years"
                    ? `Go to the previous ${
                        displayYears.to - displayYears.from + 1
                      } years`
                    : labelPrevious(previousMonth)
                }
                onClick={handlePreviousClick}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="absolute right-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
                type="button"
                tabIndex={isNextDisabled ? undefined : -1}
                disabled={isNextDisabled}
                aria-label={
                  navView === "years"
                    ? `Go to the next ${
                        displayYears.to - displayYears.from + 1
                      } years`
                    : labelNext(nextMonth)
                }
                onClick={handleNextClick}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          );
        },
        CaptionLabel: ({ children }) => (
          <Button
            className="h-7 w-full truncate text-sm font-medium"
            variant="ghost"
            size="sm"
            onClick={() =>
              setNavView((prev) => (prev === "days" ? "years" : "days"))
            }
          >
            {navView === "days"
              ? children
              : displayYears.from + " - " + displayYears.to}
          </Button>
        ),
        MonthGrid: ({ className, children, ...props }) => {
          const { goToMonth } = useDayPicker();
          if (navView === "years") {
            return (
              <div
                className={cn("grid grid-cols-4 gap-y-2", className)}
                {...props}
              >
                {Array.from(
                  { length: displayYears.to - displayYears.from + 1 },
                  (_, i) => {
                    const isBefore =
                      differenceInCalendarDays(
                        new Date(displayYears.from + i, 12, 31),
                        startMonth!
                      ) < 0;

                    const isAfter =
                      differenceInCalendarDays(
                        new Date(displayYears.from + i, 0, 0),
                        endMonth!
                      ) > 0;

                    const isDisabled = isBefore || isAfter;
                    return (
                      <Button
                        key={i}
                        className={cn(
                          "h-7 w-full text-sm font-normal text-foreground",
                          displayYears.from + i === new Date().getFullYear() &&
                            "bg-accent font-medium text-accent-foreground"
                        )}
                        variant="ghost"
                        onClick={() => {
                          setNavView("days");
                          goToMonth(
                            new Date(
                              displayYears.from + i,
                              new Date().getMonth()
                            )
                          );
                        }}
                        disabled={navView === "years" ? isDisabled : undefined}
                      >
                        {displayYears.from + i}
                      </Button>
                    );
                  }
                )}
              </div>
            );
          }
          return (
            <table className={className} {...props}>
              {children}
            </table>
          );
        },
      }}
      numberOfMonths={columnsDisplayed}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
