import clsx from "clsx"
import React, { FunctionComponent, InputHTMLAttributes } from "react"
import styles from "./style.module.css"

type OptionProps = {
  name: string
  checked: boolean
  setSelected: (i: string) => void
}

const Option: FunctionComponent<OptionProps> = ({
  name,
  checked,
  setSelected,
}) => {
  const onChange = React.useCallback<
    NonNullable<InputHTMLAttributes<HTMLInputElement>["onChange"]>
  >(
    (e) => {
      if (e.currentTarget.checked) setSelected(name)
    },
    [setSelected, name]
  )
  return (
    <div className={clsx(styles.option, checked && styles.checked)}>
      <label>
        <input type="radio" checked={checked} onChange={onChange} />
        <span>{name}</span>
      </label>
    </div>
  )
}

export type Props = {
  options: string[]
  selected: string
  setSelected: (i: string) => void
}

const SegmentedControl: FunctionComponent<Props> = ({
  options,
  selected,
  setSelected,
}) => {
  const selectedI = options.indexOf(selected)
  return (
    <div className={styles.segmentedControl}>
      <span
        className={styles.selection}
        style={{ transform: `translateX(${selectedI * 100}%)` }}
      />

      {options.map((option, i) => (
        <Option
          key={option}
          name={option}
          checked={i === selectedI}
          setSelected={setSelected}
        />
      ))}
    </div>
  )
}

export default SegmentedControl
