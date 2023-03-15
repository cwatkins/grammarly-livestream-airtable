import "./styles.css"
import { Box, initializeBlock, Button } from "@airtable/blocks/ui"
import React, { useEffect, useRef, useState } from "react"
import { useActiveRecord } from "./hooks/useActiveRecord"

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

  return (
    <Box className="container">
      <Box>
        <h1 className="header-text">Writing assistant</h1>
      </Box>
      {text.length > 0 ? (
        <Box className="grammarly-plugin-container">
          <textarea
            ref={textArea}
            className="grammarly-text-area"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
          />
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
