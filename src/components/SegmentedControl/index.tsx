import React, { FunctionComponent } from "react"
import styles from "./style.module.css"

type OptionProps = { name: string; checked: boolean }

export type Props = {
  options: string[]
}

const makeId = (() => {
  let idCounter = 0
  return () => `__option__${idCounter++}`
})()

const Option: FunctionComponent<OptionProps> = ({ name, checked }) => {
  const id = React.useMemo(makeId, [])
  return (
    <div className={styles.option}>
      <input type="radio" id={id} checked={checked} />
      <label htmlFor={id}>
        <span>{name}</span>
      </label>
    </div>
  )
}

const SegmentedControl: FunctionComponent<Props> = ({ options }) => (
  <div className={styles.segmentedControl}>
    <span className={styles.selection}></span>

    {options.map((option, i) => (
      <Option key={option} name={option} checked={i === 0} />
    ))}
  </div>
)

export default SegmentedControl
