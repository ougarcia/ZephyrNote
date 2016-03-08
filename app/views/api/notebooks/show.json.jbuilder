json.(@record, :id, :title, :created_at, :updated_at)
json.notes do
  json.array! @record.notes do |note|
    json.(note, *Note.column_names)
    json.tags do
      json.array! note.tags do |tag|
        json.(tag, *Tag.column_names)
      end
    end
  end
end
