import { Chart } from "chart.js";
import { Component, createRef } from "react";

export interface ChartItem {
    label: string;
    value: number;
    color: string[];
    total: number;
}

export interface DoughnutChartProps {
    data: ChartItem[];
    // onFocus: (dataIndex: number) => void;
}

export class DoughnutChart extends Component<DoughnutChartProps> {
    private canvasRef = createRef<HTMLCanvasElement>();
    private chart!: Chart;
    private dataSet: any;
    private radiusValues: any;
    private cutoutValues: any;

    render() {
        return <canvas ref={this.canvasRef} />;
    }

    componentWillUnmount() {
        this.chart?.destroy();
    }

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate(prevProps: Readonly<DoughnutChartProps>) {
        if (this.props !== prevProps) {
            console.log(this.props.data);
            if (this.props.data.length > 2) {
                this.chart.data.labels = this.props.data.map(
                    ({ label }) => label
                );
                //@ts-ignore

                const answer = this.props.data.map(
                    ({ label, value, color, total }, i) => {
                        const radiusValues = ["100%", "90%", "80%"];
                        const cutoutValues = ["45", "45", "45"];
                        if (i === 0) {
                        }
                        return {
                            data: [total, value],
                            backgroundColor: color,
                            borderWidth: 0,
                            hoverOffset: 2,
                            borderRadius: 15,
                            spacing: -15,
                            radius: radiusValues[i],
                            cutout: cutoutValues[i],
                            margin: "5px",
                            borderJoinStyle: "round",
                            rotation: 180,
                        };
                    }
                );
                this.dataSet = answer;
                this.chart.data.datasets = this.dataSet;
            }
        }

        //@ts-ignore
        this.chart.options.animation = { animateRotate: true };
        this.chart.update();
    }

    private createChart = () => {
        this.radiusValues = ["100%", "90%", "80%"];
        this.cutoutValues = ["45", "45", "45"];

        this.dataSet = [];
        if (this.props.data.length > 2) {
            this.chart = new Chart(this.canvasRef.current!, {
                type: "doughnut",
                options: {
                    animation: { animateRotate: false },
                    hover: { mode: "nearest", intersect: false },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: false,
                        },
                    },
                },
                data: {
                    labels: ["blank"],
                    datasets: [],
                },
            });
        }
    };
}
