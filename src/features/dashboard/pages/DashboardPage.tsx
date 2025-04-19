import {useState} from 'react'
import {GridColDef, GridRowModel, GridRowParams} from '@mui/x-data-grid'
import {ExpenseGrid} from '@common/components'
import dayjs from 'dayjs'

interface Transaction extends GridRowModel {
  date?: string
  number?: string
  payee?: string
  account?: string
  memo?: string
  payment?: number
  deposit?: number
  balance?: number
}

const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: '2025-04-10',
    number: 'CHK-0001',
    payee: 'PNC Bank',
    account: 'Checking',
    memo: 'Green 7587',
    payment: 1377.61,
    deposit: 213.54,
    balance: 24584.24,
  },
  {
    id: 2,
    date: '2025-04-10',
    number: 'CHK-0002',
    payee: 'PNC Bank',
    account: 'Checking',
    memo: 'Blue 2485',
    payment: 194.12,
    deposit: undefined,
    balance: 24390.12,
  },
  // …add more initial rows as needed…
]

const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Date',
    width: 110,
    editable: true,
    type: 'date',
    valueGetter: (params: GridRowParams) =>
      params?.row?.date ? new Date(params.row.date) : null,
    valueFormatter: (params) =>
      params ? dayjs(params as Date).format('MM/DD/YY') : '',
  },
  {
    field: 'number',
    headerName: 'Number',
    width: 100,
    editable: true,
  },
  {
    field: 'payee',
    headerName: 'Payee',
    flex: 1,
    editable: true,
  },
  {
    field: 'account',
    headerName: 'Account',
    flex: 1,
    editable: true,
  },
  {
    field: 'memo',
    headerName: 'Memo',
    flex: 2,
    editable: true,
  },
  {
    field: 'payment',
    headerName: 'Payment',
    type: 'number',
    width: 120,
    editable: true,
    valueFormatter: (params) =>
      params != null
        ? (params as number).toLocaleString(undefined, {
          style: 'currency',
          currency: 'USD',
        })
        : '',
  },
  {
    field: 'deposit',
    headerName: 'Deposit',
    type: 'number',
    width: 120,
    editable: true,
    valueFormatter: (params) =>
      params != null
        ? (params as number).toLocaleString(undefined, {
          style: 'currency',
          currency: 'USD',
        })
        : '',
  },
  {
    field: 'balance',
    headerName: 'Balance',
    type: 'number',
    width: 140,
    editable: false,
    valueFormatter: (params) =>
      params != null
        ? (params as number).toLocaleString(undefined, {
          style: 'currency',
          currency: 'USD',
        })
        : '',
  },
]

export default function DashboardPage() {
  const [rows, setRows] = useState<Transaction[]>(initialTransactions)

  const handleSave = (updatedRow: GridRowModel) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === updatedRow.id ? {...r, ...updatedRow} : r
      )
    )
  }

  const handleDelete = (id: GridRowModel['id']) => {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <ExpenseGrid
      columns={columns}
      rows={rows}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  )
}
