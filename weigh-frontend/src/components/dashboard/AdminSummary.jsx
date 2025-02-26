import SummaryCard from './SummaryCard'

const AdminSummary = () => {
  return (
    <div className="p-6">
        <h3 className="text-2xl font-bold">Dashboard Detalhe</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <SummaryCard color="bg-red-500" text="Última leitura:" date={"2025/02/21"} data={4} name={"John Bruno"} phone={"(85) 98974 1254"} />
            <SummaryCard color="bg-yellow-500" text="Última leitura:" date={"2025/02/21"} data={8} name={"Maria Fátma"} phone={"(85) 98974 2254"}/>
            <SummaryCard color="bg-green-500" text="Última leitura:" date={"2025/02/21"} data={12} name={"Eduardo"} phone={"(85) 98974 1253"}/>
        </div>
    </div>
  )
}

export default AdminSummary