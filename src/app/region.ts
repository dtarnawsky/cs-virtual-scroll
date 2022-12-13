import { Breadcrumb } from "./breadcrumb"

export interface Region {    
        uid: number
        nome: string
        breadcrumb: Breadcrumb[]
        extent: number[][]
        osmid?: number
        cod_rip: number
        cod_reg: number
        cod_prov: number
        pro_com: number      
}