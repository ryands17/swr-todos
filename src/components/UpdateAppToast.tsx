import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'

export const UpdateAppToast = () => {
  let [toast, showToast] = useState(false)

  useEffect(() => {
    window.addEventListener('newContentAvailable', newContentAvailable)

    return () =>
      window.removeEventListener('newContentAvailable', newContentAvailable)
  }, [])

  if (!showToast) return null

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={toast}
      autoHideDuration={6000}
      message="A new update is available."
      action={
        <>
          <Button color="secondary" size="small" onClick={handleClose}>
            UPDATE
          </Button>
        </>
      }
    />
  )

  function newContentAvailable() {
    showToast(true)
  }

  function handleClose() {
    showToast(false)
    window.location.reload()
  }
}
