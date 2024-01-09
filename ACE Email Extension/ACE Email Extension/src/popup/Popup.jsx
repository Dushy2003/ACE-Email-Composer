import '@picocss/pico'
import { useEffect, useRef } from 'preact/hooks'
import { useState } from 'react'
import { getUserConfig, updateUserConfig, keys, deleteKey } from '../config'
import './styles.css'

function Popup() {
  const messageReadPrependQueryRef = useRef(null)

  const [needsReset, setNeedsReset] = useState(false)

  useEffect(() => {
    getUserConfig(keys.MESSAGE_PREPEND_QUERY).then((configQuery) => {
      messageReadPrependQueryRef.current.value = configQuery
    })
  }, [needsReset])

  const saveNewQuery = () => {
    const messageReadPrependQuery = messageReadPrependQueryRef.current.value
    const updateObj = {
      [keys.MESSAGE_PREPEND_QUERY]: messageReadPrependQuery,
    }
    updateUserConfig(updateObj)
  }

  const restoreToDefault = async () => {
    await deleteKey(keys.MESSAGE_PREPEND_QUERY)
    setNeedsReset(!needsReset) // Just toggling to redraw the component
  }

  return (
    <div className="container">
      <div>
        <h4>Message Read Query </h4>
      </div>
      <textarea
        type="text"
        ref={messageReadPrependQueryRef}
        name="new-question"
        rows="10"
      ></textarea>
      <div className="button-container">
        <button className="button-with-margin" onClick={restoreToDefault}>
          {' '}
          Restore to Default{' '}
        </button>
        <button className="button-with-margin" onClick={saveNewQuery}>
          {' '}
          Update{' '}
        </button>
      </div>
    </div>
  )
}

export default Popup
