export const mockBoard = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "OPEN",
      itemsOrder: ["item-1", "item-2"],
    },
    "column-2": {
      id: "column-2",
      title: "Board Title",
      itemsOrder: ["item-3"],
    },
    "column-3": {
      id: "column-3",
      title: "Board Title",
      itemsOrder: ["item-4"],
    },
    "column-4": {
      id: "column-4",
      title: "Board Title",
      itemsOrder: [],
    },
    "column-5": {
      id: "column-5",
      title: "Board Title",
      itemsOrder: [],
    },
  },
  items: {
    "item-1": {
      id: "1",
      title: "Operasyon Birimi",
      description:
        "Bu örnek görevdir. Örnek görevin içeriğine dair açıklama detail’da bulunmaktadır.",
      status: "Milestone Name",
      color: "text-blue-400",
    },
    "item-2": {
      id: "2",
      title: "Teknik Birimi",
      description: "İkinci Görev",
      status: "Milestone Name",
      color: "text-yellow-400",
    },
    "item-3": {
      id: "3",
      title: "Test ve Onay Birimi",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. In sunt odio omnis libero magni similique, doloribus itaque totam vel. Magni fugit quas possimus quod voluptatum?",
      status: "Milestone Name",
      color: "text-orange-400",
    },
    "item-4": {
      id: "4",
      title: "Task Four",
      description: "Description for task four",
      status: "Milestone Name",
      color: "text-green-400",
    },
  },
  columnsOrder: ["column-1", "column-2", "column-3", "column-4", "column-5"],
};

export const assignPhotos = [
  { path: `/avatar.svg` },
  { path: `/avatar.svg` },
  { path: `/avatar.svg` },
];
