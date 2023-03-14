import {
  useCursor,
  useLoadable,
  useWatchable,
  useBase,
  useRecords,
} from "@airtable/blocks/ui"

export function useActiveRecord() {
  // 1. Set up a cursor to get our current table
  const cursor = useCursor()
  useLoadable(cursor)
  useWatchable(cursor, ["selectedRecordIds", "selectedFieldIds"])

  // 2. Get our records from table
  const base = useBase()
  const table = base.getTableByIdIfExists(cursor.activeTableId)
  const records = useRecords(table)

  // 3. Get our activeRecord ID
  const activeRecordId = cursor.selectedRecordIds[0]
  const activeFieldId = cursor.selectedFieldIds[0]
  const activeRecord = records.find((r) => r.id === activeRecordId)

  return {
    table,
    activeFieldId,
    activeRecord,
  }
}
