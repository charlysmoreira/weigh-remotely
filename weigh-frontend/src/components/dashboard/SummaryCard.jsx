import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";

// Inicializa os módulos corretamente
  if (typeof HighchartsMore === "function") {
      HighchartsMore(Highcharts);
  }

  if (typeof SolidGauge === "function") {
      SolidGauge(Highcharts);
  }

const SummaryCard = ({color, text, date, data, name, phone}) => {
  const chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: '80%'
    },

    title: {
        text: `${name} - ${phone}`
    },

    pane: {
        startAngle: -90,
        endAngle: 89.9,
        background: null,
        center: ['50%', '75%'],
        size: '110%'
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 13,
        tickPixelInterval: 72,
        tickPosition: 'inside',
        tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
        tickLength: 20,
        tickWidth: 2,
        minorTickInterval: null,
        labels: {
            distance: 20,
            style: {
                fontSize: '14px'
            }
        },
        lineWidth: 0,
        plotBands: [{
            from: 10,
            to: 13,
            color: '#55BF3B', // green
            thickness: 20,
            borderRadius: '50%'
        }, {
            from: 5,
            to: 0,
            color: '#DF5353', // red
            thickness: 20,
            borderRadius: '50%'
        }, {
            from: 5,
            to: 10,
            color: '#DDDF0D', // yellow
            thickness: 20
        }]
    },

    series: [{
        name: 'Speed',
        data: [data],
        tooltip: {
            valueSuffix: ' Kg'
        },
        dataLabels: {
            format: '{y} Kg',
            borderWidth: 0,
            color: (
                Highcharts.defaultOptions.title &&
                Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color
            ) || '#333333',
            style: {
                fontSize: '16px'
            }
        },
        dial: {
            radius: '80%',
            backgroundColor: 'gray',
            baseWidth: 12,
            baseLength: '0%',
            rearLength: '0%'
        },
        pivot: {
            backgroundColor: 'gray',
            radius: 6
        }
    }],
    credits: {
      enabled: false
    }
    };
    
  return (
    <div className="rounded flex bg-white h-96">
        <div className={`text-3xl flex justify-center items-center ${color} text-white p-1`}/>

        <div className="pl-4 py-1 min-w-64 w-full">
            <p className="pl-4 w-[440px] h-[350px]">
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </p>
            <p className="text-xs font-semibold h-7">{text} {date}</p>
        </div>
    </div>
  )
}

export default SummaryCard