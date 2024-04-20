import React, { useState } from 'react';
import TopBar from 'components/topBar/TopBar';
import { Tooltip } from '@mui/material';
import AddSpareParts from './components/AddSpareParts';
import EditSpareParts from './components/EditSpareParts';
import { PartDetails } from './types';
import { useGetSparePartsListQuery } from './api';

const DashboardPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPartDetails, setSelectedPartDetails] = useState<PartDetails>();

  const { data, isLoading } = useGetSparePartsListQuery();

  const handleClick = (item: PartDetails) => {
    setSelectedPartDetails(item);
    setIsEditModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  }

  return (
    <div>
      <TopBar title="Stock Listing" primaryButtonConfig={{
        showButton: true,
        buttonHandler: () => setIsAddModalOpen(true),
        buttonLabel: "Add Stock",
        customClass: 'text-white bg-primaryColor whitespace-nowrap'
      }} />
      <div className="p-[14px] md:p-6">
        <table className="pb-[155px] w-full table-auto">
          <thead>
            <tr className="pb-5 text-sm font-bold text-left text-slateGrey lg:text-base">
              <th className="pb-2 pl-2 w-[150px] md:pl-6 lg:w-[10%]">
                SKU
              </th>
              <th className="pb-2 w-[350px] lg:w-[15%]">
                Name
              </th>
              <th className="pb-2 w-[250px] lg:w-[15%]">
                Quantity
              </th>
              <th className="pr-2 pb-2 w-[230px] lg:w-[15%]">
                Dealer Price
              </th>
              <th className="pr-2 pb-2 w-[230px] lg:w-[15%]">
                MRP
              </th>
              <th className="pr-2 pb-2 w-[280px] lg:w-[15%]">
                Location
              </th>
              <th className="pr-2 pb-2 w-[280px] lg:w-[15%]">
                Models
              </th>
            </tr>
          </thead>
          {!isLoading && (
            <tbody>
              {data?.map((stockItem) => (
                <tr
                  key={stockItem.sku}
                  className="text-blackGreen transition sm:hover:shadow-md sm:duration-300 sm:hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleClick(stockItem)}>
                  <td className="pt-2  text-slateGrey">
                    <div className="flex items-center py-2 pl-3 h-[62px] bg-white rounded-l-md   md:pl-6">
                      {stockItem.sku}
                    </div>
                  </td>
                  <td className="pt-2  text-slateGrey">
                    <div className="flex items-center max-w-[300px] py-2 h-[62px] text-sm bg-white">
                      <Tooltip
                        title={stockItem.name}
                        arrow={true}
                        placement="bottom-start"
                        enterTouchDelay={0}
                        className="mr-3">
                        <div className="w-[90%] truncate">
                          <span>{stockItem.name}</span>
                        </div>
                      </Tooltip>
                    </div>
                  </td>
                  <td className="pt-2  text-slateGrey">
                    <div className="flex items-center py-2 h-[62px] text-sm bg-white">
                      {stockItem.qty}
                    </div>
                  </td>
                  <td className="pt-2  text-slateGrey">
                    <div className="flex items-center py-2 h-[62px] text-sm bg-white">
                      {stockItem.dealerPrice}
                    </div>
                  </td>
                  <td className="pt-2  text-slateGrey">
                    <div className="flex items-center py-2 h-[62px] text-sm bg-white">
                      {stockItem.mrp}
                    </div>
                  </td>
                  <td className="pt-2  text-slateGrey">
                    <div className="flex items-center py-2 h-[62px] text-sm bg-white">
                      {stockItem.location || '-'}
                    </div>
                  </td>
                  <td className="pt-2  text-slateGrey">
                    <div className="flex items-center py-2 h-[62px] max-w-[300px]  rounded-r-md text-sm bg-white">
                      <Tooltip
                        title={stockItem.model || '-'}
                        arrow={true}
                        placement="bottom-start"
                        enterTouchDelay={0}
                        className="mr-3">
                        <div className="w-[90%] truncate">
                          <span>{stockItem.model || '-'}</span>
                        </div>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <AddSpareParts isPopupOpen={isAddModalOpen} handleCancel={handleCloseAddModal} />
      <EditSpareParts isPopupOpen={isEditModalOpen} partDetails={selectedPartDetails} handleCancel={handleCloseEditModal} />
    </div>
  )
}

export default DashboardPage;