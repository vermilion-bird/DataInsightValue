import Request from "../lib/request"
import qs from "qs"

export const getAnalysticDataByLang = async (query: any) => {
    
    console.log(query, `analystic/text2sql?${qs.stringify(query)}`)
    return Request.getJson(`analystic/text2sql?${qs.stringify(query)}`)
}

export const getAnalysticDimension = async (query: any) => {
    console.log(query, `/analystic/distinguish/dim_metric?${qs.stringify(query)}`)
    return Request.getJson(`/analystic/distinguish/dim_metric?${qs.stringify(query)}`)
}

export const generateChartOption = async (query: any) => {
    return Request.getJson(`generate/chart/option?${qs.stringify(query)}`)
}