
export function applyFilter({
    inputData,
    comparator,
    filterName,
  }: {
    inputData: any[];
    comparator: (a: any, b: any) => number;
    filterName: string;
  }) {
    const stabilizedThis = inputData.map((el, index) => [el, index] as const);
  
    stabilizedThis.sort((a, b) => {
      const ride = comparator(a[0], b[0]);
      if (ride !== 0) return ride;
      return a[1] - b[1];
    });
  
    inputData = stabilizedThis.map((el) => el[0]);
  
    if (filterName) {
      inputData = inputData.filter(
        (ride) => ride.start.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        ride.end.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 
      );
    }

  
    return inputData;
  }
  