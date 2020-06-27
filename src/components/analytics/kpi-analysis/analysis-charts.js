let datasetArrKpi = [
  {
    label: "Breakeven KPIs (No Profit, No Loss)",
    backgroundColor: "rgb(0,0,0)",
    borderColor: "rgb(0,0,0)",
    borderWidth: 1,
    hoverBackgroundColor: "rgb(0,0,0,0.8)",
    hoverBorderColor: "rgb(0,0,0,0.8)",
    data: []
  },

  {
    label: "Existing KPIs",
    backgroundColor: "rgba(163, 161, 251)",
    borderColor: "rgba(163, 161, 251)",
    borderWidth: 1,
    hoverBackgroundColor: "rgba(163, 161, 251, 0.8)",
    hoverBorderColor: "rgba(163, 161, 251, 0.8)",
    data: []
  },

  {
    label: "Profit Target KPIs",
    backgroundColor: "rgba(252, 175, 69)",
    borderColor: "rgba(252, 175, 69)",
    borderWidth: 1,
    hoverBackgroundColor: "rgba(252, 175, 69,0.8)",
    hoverBorderColor: "rgba(252, 175, 69, 1, 0.8)",
    data: []
  }
]

let datasetArrOutcome = [
  {
    label: "Breakeven KPIs (No Profit, No Loss)",
    backgroundColor: "rgb(0,0,0)",
    borderColor: "rgb(0,0,0)",
    borderWidth: 1,
    hoverBackgroundColor: "rgb(0,0,0,0.8)",
    hoverBorderColor: "rgb(0,0,0,0.8)",
    data: []
  },

  {
    label: "Existing KPIs",
    backgroundColor: "rgba(163, 161, 251)",
    borderColor: "rgba(163, 161, 251)",
    borderWidth: 1,
    hoverBackgroundColor: "rgba(163, 161, 251, 0.8)",
    hoverBorderColor: "rgba(163, 161, 251, 0.8)",
    data: []
  },

  {
    label: "Profit Target KPIs",
    backgroundColor: "rgba(252, 175, 69)",
    borderColor: "rgba(252, 175, 69)",
    borderWidth: 1,
    hoverBackgroundColor: "rgba(252, 175, 69,0.8)",
    hoverBorderColor: "rgba(252, 175, 69, 1, 0.8)",
    data: []
  }
]
export const kpiChartData = {
  labels: ['Cost/Purchase (CPP)', 'Cost/Initiate Checkout (CPIC)', 'Cost/Add To Cart (CPATC)', 'Cost/View Content (CPVC)'],
  datasets: datasetArrKpi
}

export const kpiChartOptions = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
    position: 'top',
  },
  title: {
    display: false,
    text: 'KPIs Graph',
    fontSize: 14
  },
  type: "bar",
  layout: {
    padding: {
      left: 20
    }
  },
  scales: {
    xAxes: [{
      ticks: {
        autoSkip: false,
        maxRotation: 33,
        minRotation: 0
      },
      barThickness: 16,
      maxBarThickness: 16
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        callback: function (value, index, values) {
          return '$ ' + value;
        },

      }
    }]
  }
}

export const outcomeChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
    position: 'top'
  },
  title: {
    display: false,
    text: 'Outcomes',
    fontSize: 14
  },
  type: "bar",
  scales: {
    xAxes: [{
      ticks: {
        autoSkip: false,
        maxRotation: 90,
        minRotation: 0
      },
      maxBarThickness: 30
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  layout: {
    padding: {
      left: 20,
      right: 20
    }
  }
}

export const outcomeChartData = {
  labels: ['Return on Ad Spent (ROAS)'],
  datasets: datasetArrOutcome
}

export const series = [0]
export const options = {
  chart: {
    type: 'radialBar',
    offsetY: -30,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#d8deef",
        strokeWidth: '97%',
        startAngle: undefined,
        endAngle: undefined,
        opacity: 1,
        // margin: 3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 0,
          color: '#999',
          opacity: 0.5,
          blur: 1
        }
      },
      dataLabels: {
        enabled: true,
        name: {
          show: false
        },
        value: {
          show: true,
          fontSize: '18px',
          fontFamily: undefined,
          fontWeight: 400,
          color: 'gray',
          offsetY: 2,
          formatter: function (val) {
            return val + '%'
          }
        },
      }
    }
  },
  colors: ['#37d251'],
  labels: []
}