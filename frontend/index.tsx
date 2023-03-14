import "./styles.css"
import { Box, initializeBlock, Button } from "@airtable/blocks/ui"
import React, { useEffect, useRef, useState } from "react"
import { useActiveRecord } from "./hooks/useActiveRecord"
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react"

function GrammarlyPluginDemo() {
  const { table, activeRecord, activeFieldId } = useActiveRecord()
  const [text, setText] = useState<string>("")
  const textArea = useRef(null)

  // Set text using record (row) and field ID (column)
  useEffect(() => {
    if (activeRecord) {
      setText(activeRecord.getCellValueAsString(activeFieldId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFieldId, activeRecord?.id])

  // Dispatch a change event when the text changes due to state changes
  useEffect(() => {
    textArea?.current?.dispatchEvent(new Event("change"))
  }, [text])

  return (
    <Box className="container">
      <Box>
        <h1 className="header-text">Writing assistant</h1>
      </Box>
      {text.length > 0 ? (
        <Box className="grammarly-plugin-container">
          <GrammarlyEditorPlugin
            clientId=""
            config={{
              activation: "immediate",
            }}
          >
            <textarea
              ref={textArea}
              className="grammarly-text-area"
              value={text}
              onChange={(e) => {
                setText(e.target.value)
              }}
            />
          </GrammarlyEditorPlugin>
          <Box className="grammarly-button-container">
            <Button
              onClick={async () => {
                await table.updateRecordAsync(activeRecord?.id, {
                  [activeFieldId]: text,
                })
              }}
              size="large"
            >
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <p>Click on a cell to use the plugin</p>
      )}
    </Box>
  )
}

initializeBlock(() => <GrammarlyPluginDemo />)
