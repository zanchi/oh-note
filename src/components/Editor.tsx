import React, { useEffect, useRef } from 'react'
import * as monaco from 'monaco-editor'

type Props = {
  noteId: string
  // `sizes` is only used to trigger the monaco
  // editor's layout function
  sizes: number[]
  text: string
}

const Editor = ({ noteId, sizes, text = '' }: Props) => {
  const container = useRef()
  const editor = useRef(null)

  useEffect(() => {
    if (editor.current) return

    editor.current =
      container.current &&
      monaco.editor.create(container.current, {
        language: 'markdown',
        minimap: {
          enabled: false,
        },
        theme: 'hc-black',
        value: text,
      })
  }, [])

  useEffect(() => {
    if (!editor.current) return

    editor.current.layout()
  }, [sizes])

  useEffect(() => {
    if (!editor.current) return

    // TODO: Save editor value when switching notes
    const lastValue = editor.current.getValue()
    editor.current.setValue(text)
  }, [noteId])

  return <div className="editor" ref={container} />
}

export default Editor
