import { useAppSelector } from "../../../redux/store";

import { selectIsDeliveryModalOpen } from "../../../redux/control/slice";
import DeliveryFrame from "./DeliveryFrame";
import AnimatedModalOverlay from "../AnimatedModalOverlay";

const DeliveryModal: React.FC = () => {
  const deliveryModal = useAppSelector(selectIsDeliveryModalOpen);

  return (
    <>
      <AnimatedModalOverlay showModal={deliveryModal!} height={480} width={560}>
        <DeliveryFrame />
      </AnimatedModalOverlay>
    </>
  );
};

export default DeliveryModal;
