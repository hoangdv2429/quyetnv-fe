export const formatActivity = (action) => {
    if(action === 1) {
        return `Issued documents`;
    } else if(action === 2) {
        return `Revoked documents`;
    } else if(action === 3) {
        return `Deployed contract`;
    }
  };

export const formatBatchStatus = (status) => {
    if(status === 1) {
        return `Pending`;
    } else if(status === 2) {
        return `Issued`;
    } else if(status === 3) {
        return `Revoke`;
    }
};

export const removeAccents = (str) => {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }

export const formatClassification = (str) => {
    switch(str) {
        case 'Exellent':
          return 'Xuất sắc';
        case 'Good':
            return 'Giỏi';
        case 'Average':
            return 'Trung bình';
      }
}

export const formatStudyMode = (str) => {
    switch(str) {
        case 'Fulltime':
          return 'Chính quy';
        case 'Partime':
            return 'Liên thông';
      }
}