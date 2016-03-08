json.(@record, :id, :title, :created_at, :updated_at)
json.notes do
  json.array! @record.notes do |note|
    json.(note, *Note.column_names)
  end
end
