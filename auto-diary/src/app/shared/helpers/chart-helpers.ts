import { Chart } from "chart.js/auto";
import { FuelRecord } from "../interfaces/fuel-record";

export function createFuelChart(
    canvas: HTMLCanvasElement,
    records: FuelRecord[],
    existingChart: Chart | null
): Chart | null {

    if (existingChart) { existingChart.destroy(); }

    if (records.length < 2) { return null; }

    const labels: string[] = [];
    const data: number[] = [];
    for (let i = 2; i < records.length; i++) {
        const km = records[i].mileage - records[i - 1].mileage;
        if (km > 0) {
            const consumption = (records[i].liters / km) * 100;
            labels.push(records[i].date);
            data.push(Math.round(consumption * 10) / 10);
        }
    }

    return new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'л/100км',
                data: data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7,
                datalabels: {
                    color: '#94a3b8',
                    anchor: 'end',
                    align: 'end',
                    formatter: (value, context) => {
                        const i = context.dataIndex + 2;
                        return `${records[i].liters}л`;
                    }
                }
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // позволява CSS да контролира размера
            scales: {
                y: {
                    beginAtZero: false,
                    min: 6,
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#94a3b8' }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const i = ctx.dataIndex + 1;
                            return [
                                `Разход: ${ctx.parsed.y} л/100км`,
                                `Литри: ${records[i].liters} л`,
                                `Бензиностанция: ${records[i].gasStation || '---'}`
                            ];
                        }
                    }
                },
                datalabels: {
                    display: true
                },
                legend: {
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'line'
                    }
                }
            }
        }
    });

}