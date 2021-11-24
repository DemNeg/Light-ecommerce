package com.kuma.ecommerce;

import com.kuma.ecommerce.Dao.CategoryRepository;
import com.kuma.ecommerce.Dao.ProductRepository;
import com.kuma.ecommerce.entities.Category;
import com.kuma.ecommerce.entities.Product;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.Random;

@SpringBootApplication
public class LightEcommerceApplication implements CommandLineRunner {
	@Autowired
private ProductRepository productRepository;
	@Autowired
private CategoryRepository categoryRepository;
	@Autowired
	public RepositoryRestConfiguration restConfiguration;
	public static void main(String[] args) {
		SpringApplication.run(LightEcommerceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		restConfiguration.exposeIdsFor(Product.class,Category.class);
		categoryRepository.save(new Category(null,"Ordinateur",null,null,null));
		categoryRepository.save(new Category(null,"Printers",null,null,null));
		categoryRepository.save(new Category(null,"Smart Phones",null,null,null));
		Random rnd = new Random();
		categoryRepository.findAll().forEach(c->{
			for (int i = 0; i < 10; i++) {
				Product product = new Product();
				product.setName(RandomString.make(18));
				product.setCurrentPrice(100+rnd.nextInt(10000));
				product.setAvailable(rnd.nextBoolean());
				product.setPromotion(rnd.nextBoolean());
				product.setSelected(rnd.nextBoolean());
				product.setPhotoName("unknown.png");
				product.setCategory(c);
				productRepository.save(product);
			}
		});

	}
}
