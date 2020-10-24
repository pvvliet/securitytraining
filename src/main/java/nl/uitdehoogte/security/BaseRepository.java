package nl.uitdehoogte.security;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class BaseRepository<T extends BaseModel>
{
    private static int lastId = 0;

    @Autowired(required = true)
    private ModelMapper modelMapper;

    private final List<T> models = new ArrayList<>();

    public void add(final T model)
    {
        model.setId("" + ++lastId);

        models.add(model);
    }

    public Collection<T> getAll()
    {
        return models;
    }

    public Optional<T> get(String id)
    {
        return findFirst(model -> model.getId().equals(id));
    }

    public Collection<T> findAll(Predicate<T> predicate)
    {
        return models.stream()
                .filter(predicate)
                .collect(Collectors.toList());
    }

    public Optional<T> findFirst(Predicate<T> predicate)
    {
        return models.stream()
                .filter(predicate)
                .findFirst();
    }

    public void update(final T actual, final T updated)
    {
        modelMapper.map(updated, actual);
    }

    public void delete(final T model)
    {
        models.remove(model);
    }
}
