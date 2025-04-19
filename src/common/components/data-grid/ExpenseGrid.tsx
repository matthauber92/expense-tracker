// ExpenseGrid.tsx
import React, {useState, useMemo} from 'react'
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridRowModesModel,
  GridRowModes,
  GridRowEditStopReasons,
  GridEventListener,
  GridActionsCellItem,
} from '@mui/x-data-grid'
import {Edit, Save, Cancel, Delete} from '@mui/icons-material'

interface ExpenseGridProps {
  /** Column definitions (mark editable: true on any field you want to edit) */
  columns: GridColDef[]
  /** Initial row data */
  rows: GridRowModel[]
  /** Called when a row is saved: receive updated row */
  onSave: (row: GridRowModel) => void
  /** Called when a row is deleted: receive the row id */
  onDelete: (id: GridRowModel['id']) => void
}

const ExpenseGrid: React.FC<ExpenseGridProps> = ({
                                                   columns,
                                                   rows: initialRows,
                                                   onSave,
                                                   onDelete,
                                                 }) => {
  const [rows, setRows] = useState<GridRowModel[]>(initialRows)
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  // Handlers for the action buttons:
  const handleEditClick = (id: GridRowModel['id']) => {
    setRowModesModel(m => ({...m, [id]: {mode: GridRowModes.Edit}}))
  }
  const handleSaveClick = (id: GridRowModel['id']) => {
    setRowModesModel(m => ({...m, [id]: {mode: GridRowModes.View}}))
  }
  const handleDeleteClick = (id: GridRowModel['id']) => {
    setRows(r => r.filter(row => row.id !== id))
    onDelete(id)
  }
  const handleCancelClick = (id: GridRowModel['id']) => {
    setRowModesModel(m => ({...m, [id]: {mode: GridRowModes.View, ignoreModifications: true}}))
  }
  // Prevent focus loss from auto‑saving:
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }
  // Commit changes:
  const processRowUpdate = (newRow: GridRowModel) => {
    setRows(r => r.map(row => (row.id === newRow.id ? newRow : row)))
    onSave(newRow)
    return newRow
  }

  // Append our actions column:
  const actionsColumn: GridColDef = useMemo(
    () => ({
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      getActions: ({id}) => {
        const isEditing = rowModesModel[id]?.mode === GridRowModes.Edit
        if (isEditing) {
          return [
            <GridActionsCellItem icon={<Save/>} label="Save" onClick={() => handleSaveClick(id)}/>,
            <GridActionsCellItem icon={<Cancel/>} label="Cancel" onClick={() => handleCancelClick(id)}
                                 color="inherit"/>,
          ]
        }
        return [
          <GridActionsCellItem icon={<Edit/>} label="Edit" onClick={() => handleEditClick(id)}/>,
          <GridActionsCellItem icon={<Delete/>} label="Delete" onClick={() => handleDeleteClick(id)} color="inherit"/>,
        ]
      },
    }),
    [rowModesModel]
  )

  const finalColumns = useMemo(() => [...columns, actionsColumn], [columns, rowModesModel])

  return (
    <div style={{height: 400, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={finalColumns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={processRowUpdate}
        onRowEditStop={handleRowEditStop}
        disableRowSelectionOnClick
      />
    </div>
  )
}

export default ExpenseGrid;