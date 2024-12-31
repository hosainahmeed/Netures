import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form, Input, InputNumber, Button, Select, Checkbox } from 'antd';
import SectionTitle from '../../components/ui/SectionTitle';

const { TextArea } = Input;
const { Option } = Select;

const AddToCartForm = () => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [ecoFriendlyFeatures, setEcoFriendlyFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState('');
  const categories = [
    'Mountain Treks',
    'Ocean Dives',
    'Wildlife Safaris',
    'Desert Exploration',
    'Jungle Safaris',
    'Cultural Tours',
    'Water Exploration',
  ];

  const onSubmit = async (data) => {
    const finalData = { ...data, ecoFriendlyFeatures };

    try {
      await axios.post('http://localhost:5000/add-carts', finalData, {
        withCredentials: true,
      });
      Swal.fire('Success!', 'Your data has been added successfully!', 'success');
      reset();
      setEcoFriendlyFeatures([]);
    } catch (error) {
      Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setEcoFriendlyFeatures((prev) => [...prev, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveAllFeatures = () => {
    setEcoFriendlyFeatures([]);
  };

  return (
    <>
      <SectionTitle title={'Add new Place'}></SectionTitle>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Title"
          validateStatus={errors.title ? 'error' : ''}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter title" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Image URL"
          validateStatus={errors.image ? 'error' : ''}
          help={errors.image?.message}
        >
          <Controller
            name="image"
            control={control}
            rules={{ required: 'Image URL is required' }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter image URL" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Category"
          validateStatus={errors.category ? 'error' : ''}
          help={errors.category?.message}
        >
          <Controller
            name="category"
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <Select {...field} placeholder="Select category">
                {categories.map((category, index) => (
                  <Option key={index} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Short Description"
          validateStatus={errors.shortDescription ? 'error' : ''}
          help={errors.shortDescription?.message}
        >
          <Controller
            name="shortDescription"
            control={control}
            rules={{ required: 'Short Description is required' }}
            render={({ field }) => (
              <TextArea
                {...field}
                rows={3}
                placeholder="Enter a short description"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Adventure Cost"
          validateStatus={errors.adventureCost ? 'error' : ''}
          help={errors.adventureCost?.message}
        >
          <Controller
            name="adventureCost"
            control={control}
            rules={{ required: 'Adventure Cost is required' }}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={0}
                formatter={(value) => `$ ${value}`}
                placeholder="Enter cost"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Booking Availability"
          validateStatus={errors.bookingAvailability ? 'error' : ''}
          help={errors.bookingAvailability?.message}
        >
          <Controller
            name="bookingAvailability"
            control={control}
            rules={{ required: 'Booking Availability is required' }}
            render={({ field }) => (
              <Select {...field} placeholder="Select availability">
                <Option value="Limited">Limited</Option>
                <Option value="Available">Available</Option>
                <Option value="Sold Out">Sold Out</Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Eco-Friendly Features"
          validateStatus={errors.ecoFriendlyFeatures ? 'error' : ''}
          help={errors.ecoFriendlyFeatures?.message}
        >
          <Checkbox.Group
            options={ecoFriendlyFeatures}
            onChange={(checkedValues) =>
              setValue('ecoFriendlyFeatures', checkedValues, {
                shouldValidate: true,
              })
            }
          />
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a new Eco-Friendly Feature"
            style={{ marginTop: '10px', marginBottom: '10px' }}
          />
          <Button
            type="primary"
            onClick={handleAddFeature}
            style={{ marginRight: '10px' }}
          >
            Add
          </Button>
          <Button type="danger" onClick={handleRemoveAllFeatures}>
            Remove All
          </Button>
        </Form.Item>

        <Form.Item
          label="Included Items"
          validateStatus={errors.includedItems ? 'error' : ''}
          help={errors.includedItems?.message}
        >
          <Controller
            name="includedItems"
            control={control}
            rules={{ required: 'At least one included item is required' }}
            render={({ field }) => (
              <Checkbox.Group
                {...field}
                options={[
                  'Professional guide',
                  'Acclimatization days',
                  'Meals and accommodation',
                ]}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddToCartForm;
