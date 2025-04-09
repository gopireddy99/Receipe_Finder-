export interface Recipe {
  id: number;
  title: string;
  image: string;
  instructions: string;
  usedIngredients: string[];
  missedIngredients?: string[]; // Add this line
  extendedIngredients?: string[]; // Add this line
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}