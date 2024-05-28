import { BsFilterLeft } from "react-icons/bs";
import { RxBorderDashed } from "react-icons/rx";
import { PiCellSignalHighBold,PiCellSignalMediumBold,PiCellSignalLowBold } from "react-icons/pi";
import { TbAlertSquareFilled } from "react-icons/tb";
// eslint-disable-next-line react/prop-types
const PriorityIcon = ({priority}) => {
  let PriorComponent;

  switch (priority) {
    case 0:
      PriorComponent = RxBorderDashed;
      break;
    case 1:
      PriorComponent = PiCellSignalLowBold;
      break;
    case 2:
      PriorComponent = PiCellSignalMediumBold;
      break;
    case 3:
      PriorComponent = PiCellSignalHighBold;
      break;
    case 4:
      PriorComponent = TbAlertSquareFilled;
      break;
    default:
      PriorComponent = BsFilterLeft; 
      break;
  }

  return (
    
    <div className="border border-gray-500 dark:border-gray-200  rounded">
        <PriorComponent className={`text-lg ${PriorComponent === TbAlertSquareFilled ? 'text-orange-500' : 'text-gray-600'} ${PriorComponent === TbAlertSquareFilled ? 'dark:text-orange-500' : 'dark:text-white'} `}/>
    </div>
  )
}

export default PriorityIcon